"use client";
import React, { useEffect, useState } from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { Footer } from "../../devlinkModified/Footer";
import { SignupForm } from "../../devlink/SignupForm";
import "../styles.css";

import { OnboardingBegin } from "../../devlinkModified/OnboardingBegin";
import { OnboardingNames } from "../../devlinkModified/OnboardingNames";
import { OnboardingBirthdays } from "../../devlinkModified/OnboardingBirthdays";
import { OnboardingPersonal } from "../../devlinkModified/OnboardingPersonal";
import { OnboardingQuestions1 as OnboardingQuestion1 } from "../../devlinkModified/OnboardingQuestions1";
import { OnboardingQuestion2 } from "../../devlinkModified/OnboardingQuestion2";
import { OnboardingQuestion3 } from "../../devlinkModified/OnboardingQuestion3";
import { OnboardingQuestion4 } from "../../devlinkModified/OnboardingQuestion4";
import { OnboardingQuestion5 } from "../../devlinkModified/OnboardingQuestion5";
import { OnboardingFinal } from "../../devlinkModified/OnboardingFinal";
import { OnboardingComplete } from "../../devlinkModified/OnboardingComplete";

import { request } from "../../devlinkModified/env";
import swal from 'sweetalert';

function mapToOnboardingPayload(data) {
  return {
    username: data["parent-name"] || "",
    childname: data["child-name"] || "",

    user_dob: data["parent_birth_date"] || null,
    user_time_of_birth: data["parent_birth_time"] || null,
    user_birth_place_id: data["parent_place_id"] || "",

    child_dob: data["child_birth_date"] || null,
    child_time_of_birth: data["child_birth_time"] || null,
    child_birth_place_id: data["child_place_id"] || "",

    raw_parent_message: data["raw_parent_message"] || null,

    // Steps mapping (based on your form)
    climate: data["Step1"] || null,
    activation: data["Step2"] || null,
    closeness: data["Step3"] || null,
    posture: data["Step4"] || null,

    // Optional fields (not in your current data)
    summary: null,
    emotionTags: null,
    keyThemes: null,

    parentPronouns: data["Parent-s-Pronouns"] || null,
    childPronouns: data["Child-s-Pronoun"] || null,
  };
}

const validate = (step, values) => {
  const data = mapToOnboardingPayload(values)
  if (step == 1) {
    if (!data?.username) return "Your name is required"
    if (!data?.parentPronouns) return "Your pronouns are required"
    if (!data?.childname) return "Your child's name is required"
    if (!data?.childPronouns) return "Your child's pronouns are required"
  }
  if (step == 2) {
    if (!data?.user_dob) return "Your date of birth are required"
    if (!data?.child_birth_place_id) return "Your birthplace are required"

    if (!data?.child_dob) return "Your child's date of birth are required"
    if (!data?.child_birth_place_id) return "Your child's birthplace are required"
  }
}

const App = () => {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState({})

  // request({
  //         method: "POST",
  //         endpoint: "submit_onboarding",
  //         headers: {
  //             'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
  //         },
  //         body: payload
  //     })

  const f = async () => {
    if (step == 10) {
      try {
        const token = localStorage.getItem("authToken")
        const mapped = mapToOnboardingPayload(results)
        let child_id = window.location.href.split("?child_id=")[1]

        if (!child_id) {
          const data = await request({
            method: "POST",
            endpoint: "add_children",
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: {
              name: mapped.childname,
              dob: mapped.child_dob,
              place_of_birth: results['child'],
              place_of_birth_id: mapped.child_birth_place_id,
              pronouns: mapped.childPronouns
            }
          })
          child_id = data?.child_id
        }

        const payload = {
          child_id,
          journey_id: "fff90478-924f-4ec7-95a1-68b5549a0ec9",
          onboarding_payload: mapped,
        }

        console.log("final_payload", payload)
        const { status } = await request({
          method: "POST",
          endpoint: "submit_onboarding",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: payload
        })
        if (status == "ready") {
          swal({
            title: "Success",
            text: "Your insight is ready",
            icon: "success",
          }).then(() => window.location.href = "/dashboard")
        }
      } catch (e) {
        swal({
          title: "Error",
          text: err?.message,
          icon: "error",
        })
      }
    }
  }
  useEffect(() => {

    if (step == 10) f()
  }, [step])

  useEffect(() => {
    setTimeout(() => {
      console.log(document.querySelector('.onboarding-patch a'))
      document.querySelectorAll('.onboarding-patch a').forEach(el => {
        // console.log(el, el.childElementCount)
        if (el.childElementCount === 0) {
          el.onclick = (e) => {
            e.preventDefault()
            const inputs = Object.fromEntries([...document.getElementsByTagName('input')].map(x => [
              x?.name,
              x?.type == "radio" && x?.parentElement?.nodeName == "LABEL" ?
                x?.parentElement?.querySelector('span')?.innerText :
                x?.value,
            ]))
            const selects = Object.fromEntries([...document.getElementsByTagName('select')].map(x => [x?.name, x?.value]))
            const areas = Object.fromEntries([...document.getElementsByTagName('textarea')].map(x => [x?.name, x?.value]))
            const newResults = {
              ...results,
              ...areas,
              ...inputs,
              ...selects
            }
            const error = validate(step, newResults)
            if (error) {
              swal({
                title: "Error",
                text: error,
                icon: "error",
              })
              return
            }
            setResults(newResults)
            console.log(newResults)
            setStep(prev => prev == 10 ? prev : prev + 1);
            document.firstElementChild.scrollIntoView()
          }
        } else {
          el.onclick = (e) => {
            e.preventDefault()
            setStep(prev => prev == 0 ? prev : prev - 1);
            document.firstElementChild.scrollIntoView()
          }
        }
      })
    }, 1000);
  }, [step])
  console.log(step)

  const renderStep = () => {
    switch (step) {
      case 0: return <OnboardingBegin />;
      case 1: return <OnboardingNames />;
      case 2: return <OnboardingBirthdays />;
      case 3: return <OnboardingPersonal />;
      case 4: return <OnboardingQuestion1 />;
      case 5: return <OnboardingQuestion2 />;
      case 6: return <OnboardingQuestion3 />;
      case 7: return <OnboardingQuestion4 />;
      case 8: return <OnboardingQuestion5 />;
      case 9: return <OnboardingFinal />;
      case 10: return <OnboardingComplete />;
      default: return <OnboardingBegin />;
    }
  }

  return <>
    <NavbarOnboarding />
    <div className="onboarding-patch">
      {renderStep()}
    </div>
    <Footer />
  </>
};

export default App;