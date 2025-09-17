require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { createClient } = require('@supabase/supabase-js')
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)
const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey);

// const supabase = createClient(supabaseUrl, supabaseKey,{global: {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     },
//   })
//const supabase = require('./src/config/supabaseClient')

app.get("/", (req, res) => {
  res.send("Backend is running!");
  console.log("server prasanna");
});

// API endpoint for Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log('Data :', { data });
  if (error) {
    return res.status(401).json({ message: 'Invalid Credentials' });
  }


  res.json({ message: 'Login Successful', user: data.user });
});

// Forgot Password Endpoint
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/resetpassword',
  });
  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: 'Reset link sent to your email.' });
});

// Exchange code Endpoint
app.post('/api/exchange', async (req, res) => {
  const { code } = req.body;
  const { data, error } = await supabaseAdmin.auth.exchangeCodeForSession({ code });
  if (error) return res.status(401).json({ error: error.message });
  res.json({ session: data.session });
});


// Reset Password Endpoint
app.post('/api/resetpassword', async (req, res) => {
  const { accessToken, newPassword } = req.body;

  if (!accessToken || !newPassword) {
    return res.status(400).json({ message: 'Missing access token or new password.' });
  }

  try {
    const decoded = jwt.decode(accessToken);
    const userId = decoded?.sub;
    if (!userId) {
      return res.status(401).json({ message: 'Invalid access token.' });
    }
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    // Authenticate the client with the user's access token
    // const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
    //   access_token: accessToken,
    //   refresh_token: '', // optional, include if available
    // });

    // if (sessionError) {
    //   return res.status(401).json({ message: 'Invalid or expired access token.' });
    // }

    //const { error } = await supabase.auth.updateUser({ password: newPassword, });

    if (error) return res.status(400).json({ message: error.message });
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }

});


// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email,password);
//   const { data, error } = await supabase.auth.signInWithPassword({ 
//     grant_type:'password',
//     email, 
//     password 
//   },
// {
//   headers:{
//     apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFianJlZmlodHd4enpvenh4YnN3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzM0NzY0NywiZXhwIjoyMDcyOTIzNjQ3fQ.mGf_o31hBZP_9-SACZOBlofhP-Q_KNdzlMVqZiQeOhM', 
//     'Content-Type':'application/json'
//   }
// }
// );
//   if (error) {
//     return res.status(401).json({ message: 'Invalid Credentials' });
//   }
//   res.json({ message: 'Login Successful', user: data.user });
// });

// API endpoint for Sign Up
app.post('/api/signup', async (req, res) => {
  const { email, password, name } = req.body
  console.log('Sign up data: ', { email, password, name })
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:5173/verified',
        data: { display_name: name }
      }

    });
    console.log('Sign up data: ', { data })
    if (error) {
      console.error('Sign up error:', error);
      if (error.code === 'user_already_exists') {
        return res.status(400).json({ message: 'Email already registered.' });
      }
      return res.status(400).json({ message: error.message });
    }

    // Check for pending confirmation
    if (data.user?.confirmation_sent_at || !data.user?.aud.includes('authenticated')) {
      return res.status(202).json({
        message: 'Signup initiated. Please verify your email to complete registration.',
        emailSentTo: email
      });
    }
    // Update user metadata with display name

    // const userId = data?.user?.id;
    // if (!userId) {
    //   return res.status(202).json({
    //     message: 'Signup initiated. Please verify your email to complete registration.',
    //   });
    // }

    // const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId,
    //   {
    //     user_metadata: { display_name: name },
    //   }
    // );
    // if (updateError) {
    //   console.error('Failed to update display name:', updateError.message);
    //   return res.status(500).json({ message: 'Login successful, but failed to update display name.' });
    // }

    res.status(201).json({
      message: 'User registered successfully!',
      user: data.user
    });
  }
  catch (err) {
    console.error('Unexpected error in signup:', err);
    res.status(500).json({ message: 'Internal server error during signup.' });
  }


});

app.post('/api/signout', async (req, res) => {

  try {

    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    res.status(200).json({ message: 'Signed out successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// API endpoint for customer list
app.get("/api/getcustomer", async (req, res) => {
  const { data, error } = await supabase.from('customer').select()
  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);

})

//API for customer Insert record
app.post("/api/insertcustomer", async (req, res) => {
  const { name, father_name, mobile_no, address } = req.body
  const { data, error } = await supabase
    .from('customer')
    .insert([
      { name: name, father_name: father_name, mobile_no: mobile_no, address: address },
    ])
    .select()

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);

})


// API endpoint for vehicle list
app.get("/api/getvehicles", async (req, res) => {
  const { data, error } = await supabase.from('vehicle').select()
  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);

})

// API endpoint for insert vehicle
app.get("/api/getvehicles", async (req, res) => {
  const {chasis_number,vehicle_number,status,model,make,year,price,ex_showroom,added_date } = req.body();
  const { data, error } = await supabase
    .from('vehicle')
    .insert([
      {chasis_number: chasis_number,vehicle_number: vehicle_number,status: status,model: model,make: make,year:year,price: price,
        ex_showroom: ex_showroom,added_date: added_date },
    ])
    .select()

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);

})

// API endpoint for services
app.get("/api/getservice", async (req, res) => {
  const { data, error } = await supabase.from('customer').select()
  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);

})

// API endpoint for dashboard metrics
app.get("/api/dashboard/metrics", (req, res) => {
  res.json({
    totalLoans: 24,
    activeLoans: 18,
    overduePayments: 3,
    totalCollection: 245800,
    totalCollectionFormatted: "₹2,45,800",
    totalLoansChange: "+12%",
    activeLoansRate: "75%",
    overduePaymentsNote: "Requires attention",
    totalCollectionChange: "+8%"
  });
});

// API endpoint for monthly collection trend (sample data)
app.get("/api/dashboard/monthly-collection", (req, res) => {
  res.json({
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    collection: [20000, 2000, 25000, 2000, 2700, 300, 32000, 3000]
  });
});

// API endpoint for loan status distribution (sample data)
app.get("/api/dashboard/loan-status", (req, res) => {
  res.json({
    statuses: ["Active", "Closed", "Overdue"],
    counts: [18, 5, 3]
  });
});

const customers = [
  {
    id: 1,
    loanNumber: 'LN001',
    name: 'John Doe',
    mobile: '1234567890',
    loanStatus: 'Active',
    loanDetails: 'Loan amount: $10,000',
    status: 'Active',
  },
  {
    id: 2,
    loanNumber: 'LN002',
    name: 'Jane Smith',
    mobile: '0987654321',
    loanStatus: 'Active',
    loanDetails: 'Loan amount: $15,000',
    status: 'Active',
  },
];

// GET customers
app.get("/api/customers", (req, res) => {
  res.json(customers);
});

// POST add new customer
app.post("/api/customers", (req, res) => {
  const newCustomer = req.body;
  newCustomer.id = customers.length + 1;
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});

