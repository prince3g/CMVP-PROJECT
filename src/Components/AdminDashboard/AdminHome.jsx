import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Css/Dash.css';

import SubscriptionTable from './SubscriptionTable';

import SelectNavigationIcons from './SelectNavigationIcons';

export default function AdminHome() {
    return(
        <div className="DDD-Seco">
            <div className="klka-Seco">
                 <div className="Dash-Intro">
                    <h2>Hi 👋 Admin</h2>
                    <p>Welcome to CMVP admin dashboard</p>
                </div>

                <SelectNavigationIcons />

                </div>

                <SubscriptionTable />
        </div>
    )
}