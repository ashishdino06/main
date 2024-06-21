require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const rateLimit = require('express-rate-limit');
const app = express();
const API_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const apiLimiter = rateLimit({
    windowMs : 15*60*1000,
    max:100,
});
const corsOptions = {
    origin :['http://localhost:5173'],
};


app.use(express.json());
app.use(apiLimiter);
app.use(cors(corsOptions));



app.post('/api/convert',async(req,res)=>{
    
    try {
        const {from,to,amount} = req.body;
        console.log({from,to,amount});
        const url = `${API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`
        // console.log(url);
        const response = await axios.get(url);
        if(response.data && response.data.result === 'success'){
            res.json({
                base:from,
                target :to,
                conversionRate : response.data.conversion_rate,
                convertedAmount: response.data.conversion_result,

            });
        }else{
            res.json({
                message :"Error converting currency",details:error.message
            });
        }
        
    } catch (error) {
        
    }
})
app.listen(PORT,console.log(`Server is running at PORT ${PORT}`));