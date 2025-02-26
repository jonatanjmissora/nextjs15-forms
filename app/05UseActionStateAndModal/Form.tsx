"use client"

import { useState } from "react"
import { ServerForm } from "./Form_Server"
import { ClientForm } from "./Form_Client"

export default function Form() {

  const [inputValues, setInputValues] = useState({ title: "", content: "" })
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [serverResponse, setServerResponse] = useState({ success: false, message: "" })

  return (
    <>
      {
        showConfirm
          ? (
            <ServerForm
              inputValues={inputValues}
              setInputValues={setInputValues}
              setShowConfirm={setShowConfirm}
              setServerResponse={setServerResponse}
            />
          )
          : (
            <ClientForm
              inputValues={inputValues}
              setInputValues={setInputValues}
              setShowConfirm={setShowConfirm}
              serverResponse={serverResponse}
            />
          )
      }
    </>
  )
}

