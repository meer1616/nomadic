import {
    Container,
    CssBaseline,
    Box,
    Typography,
    TextField,
    Button,
  } from "@mui/material";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { useForm } from "react-hook-form";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import ButtonThemeWrapper from "../components/ui/ButtonThemeWrapper";
  
  type FormValues = {
    email: string;
  };
  
  const ForgotPassword = () => {
    const form = useForm<FormValues>();
    const [error, setError] = useState("");
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
  
    const onSubmit = async (data: FormValues) => {
      const response = await fetch('http://localhost:8000/api/v1/forgotPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();

      if(!response.ok){
        setError(result.error)

      } else{
        setError("")
        localStorage.setItem('token',result.token);
        setSuccess(result.message)
      }
      console.log(data);
    };
  
    return (
      <>
        <div className="h-[10px]">
        <Header/>
        </div>
        <ButtonThemeWrapper>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Forgot Password</Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {error && (
                  <Typography variant="body2" color={"red"}>{error}</Typography>)}
                  {success && (
                  <Typography variant="body2" color={"green"}>{success}</Typography>)}
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="ochre">
                  Forgot Password
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
        </ButtonThemeWrapper>
      <div className="mt-16">
                <Footer />
      </div>
      </>
    );
  };
  
  export default ForgotPassword;
  