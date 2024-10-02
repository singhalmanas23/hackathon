import React, { useContext, useState,useEffect } from "react"
import axios from 'axios'

//to fetch data from the api thats why we use globalContext:


const BASE_URL = "http://localhost:5001/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [limits,setLimits] = useState([])
    //const [daily,setDaily]=useState()
    const [error, setError] = useState(null)
    const[notifications, setNotifications]=useState([])
    const[budget,setBudget]=useState([])


    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}getIncomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}getExpenses`)
        setExpenses(response.data)
        console.log(response.data)
    }
    const getBudget = async () => {
        const response = await axios.get(`${BASE_URL}getBudget`)
        setBudget(response.data)
        console.log(response.data)
    }
    
   const getNotifications=async()=>{
        const response =await axios.get(`${BASE_URL}getNotifications`)
        setNotifications(response.data);
    }

    // useEffect(() => {
    //     const fetchIncomes = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}getIncomes`);
    //             setIncomes(response.data);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     };

    //     const fetchExpenses = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}getExpenses`);
    //             setExpenses(response.data);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     };

    //     fetchIncomes();
    //     fetchExpenses();
    // }, []);

    //calculate incomes
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}addIncome`, income);
            getIncomes(); // This will fetch updated incomes after successfully adding a new one
        } catch (error) {
            setError(error.response.data.message); // Set error state if the request fails
        }
    };
    const addBudget = async (budget) => {
        try {
            const response = await axios.post(`${BASE_URL}addBudget`, budget);
            getBudget(); // This will fetch updated incomes after successfully adding a new one
        } catch (error) {
            setError(error.response.data.message); // Set error state if the request fails
        }
    };
    const deleteBudget = async (id) => {
        const res  = await axios.delete(`${BASE_URL}deleteBudget/${id}`)
        getBudget()
    }



    // const getIncomes = async () => {
    //     const response = await axios.get(`${BASE_URL}getIncomes`)
    //     setIncomes(response.data)
    //     //onsole.log(response.data)
    // }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}deleteIncome/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}addExpenses`,expense);
            getExpenses(); // This will fetch updated expenses after successfully adding a new one
        } catch (error) {
            setError(error.response.data.message); // Set error state if the request fails
        }
    };
    // const getExpenses = async () => {
    //     const response = await axios.get(`${BASE_URL}getExpenses`);
    //     setExpenses(response.data);
    //     //console.log(response.data);
    // }


    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}deleteExpenses/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }
    const totalBudget = () => {
        let totalIncome = 0;
        budget.forEach((income) =>{
            totalIncome = totalIncome + budget.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }
    
    const transaction = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history;
    }
    
    
    const addLimit = async (limit) => {
        const response = await axios.post(`${BASE_URL}addLimit`, limit)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getLimits()
    }
    const getLimits = async () => {
        const response = await axios.get(`${BASE_URL}getLimit`)
        setLimits(response.data)
        //console.log(response.data)
    }
    function totalLimit() {
        const currentDayLimit = limits.find(limit => {
            const limitDate = new Date(limit.date);
            const currentDate = new Date();
            return limitDate.toDateString() === currentDate.toDateString();
        });
        return currentDayLimit ? currentDayLimit.amount : 0;
    }
    const makePayment = async (paymentDetails) => {
        try {
            const response = await axios.post(`${BASE_URL}payment`, paymentDetails);
        } catch (error) {
            console.error('Error making payment:', error);
        }
    };



    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            transaction,
            limits,
            addLimit,
            getLimits,
            totalLimit,
            error,
            setError,
            notifications,
            getNotifications,
            budget,
            getBudget,
            addBudget,
            deleteBudget,
            totalBudget,
            makePayment
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}