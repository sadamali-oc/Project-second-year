import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "./components/Header";
import VerticalNav from "./components/VerticalNav";


function LayOut() {
    return (
        <div>
            <Header />
            <div style={{ display: 'flex' }} >
                <VerticalNav />
                <div style={{
                    display: 'flex',
                    margin: '100px 20px 20px 20px',
                }} >



                </div>
            </div>
        </div>
    );
}

export default LayOut;

