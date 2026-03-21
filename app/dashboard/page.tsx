
"use client";
import React, { useState, useEffect } from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";

import { DashboardWelcome } from "../../devlinkModified/DashboardWelcome";
import { DashboardChildListing } from "../../devlinkModified/DashboardChildListing";
import { DashboardJourneys } from "../../devlinkModified/DashboardJourneys";
import { DashboardDefaultJourneys } from "../../devlinkModified/DashboardDefaultJourneys";
import { DashboardChildJourney } from "../../devlinkModified/DashboardChildJourney";
import { DashboardYourFamily } from "../../devlinkModified/DashboardYourFamily";

import { Footer } from "../../devlinkModified/Footer";
import { request } from "../../devlinkModified/env";

import "../loader.css"

const App = () => {
    const [children, setChildren] = useState<Record<string, { child: any; insights: any[] }>>({})
    const nOfChildren = Object.keys(children).length

    const [selectedChild, setSelectedChild] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

    const refreshData = () => setRefresh(!refresh)

    useEffect(() => {
        const f = async () => {
            const { children, insights, purchases } = await request({
                method: "GET",
                endpoint: "/get_children",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            })
            const childrenObj: Record<string, { child: any; insights: any[], purchases: any[] }> = {}
            for(const child of children) childrenObj[child?.id] = { child, insights: [], purchases: [] }
            for(const insight of insights) childrenObj[insight?.child_id]?.insights?.push?.(insight)
            for(const purchase of purchases) childrenObj[purchase?.child_id]?.purchases?.push?.(purchase)

            const firstChild = childrenObj[Object.keys(childrenObj)[0]]
            // @ts-ignore
            if(firstChild && selectedChild === null) setSelectedChild(firstChild?.child?.id)

            setChildren(childrenObj)
            setLoading(false)
        }
        f()

        // const i = setInterval(f, 5_000)
        // return () => clearInterval(i)
    }, [refresh])

    if(loading) return <>
        <NavbarOnboarding />
        <div className="loader-container">
            <div className="loader"/>
        </div>
        <Footer />
    </>

    return <>
        <div>
            <NavbarOnboarding />
            <DashboardWelcome nOfChildren={nOfChildren}/>
            {
                nOfChildren > 0 && <>
                    <DashboardYourFamily/>
                    <DashboardChildListing family={children} setLoading={setLoading} refreshData={refreshData} selectedChild={selectedChild} setSelectedChild={setSelectedChild}/>
                    <DashboardChildJourney setLoading={setLoading} child={children[selectedChild]?.child}/>
                </>
            }
            {
                nOfChildren == 0 && <DashboardDefaultJourneys/>
            }
            <DashboardJourneys setLoading={setLoading} item={children?.[selectedChild]} nOfChildren={nOfChildren}/>
            <Footer />
        </div>
    </>
};

export default App;