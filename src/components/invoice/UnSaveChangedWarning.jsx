import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Prompt from "./Prompt"

function UnSaveChangedWarning(message = "Nếu rời khỏi trang dữ liệu sẽ mất, bạn có muốn rời trang?") {
    const [isDirty, setDirty] = useState(false)
    useEffect(() => {
        window.onbeforeunload = isDirty && (() => message)
        
        return () => {
            window.onbeforeunload = null
        }
    }, [isDirty])
    const routerPrompt = <Prompt when={isDirty} message={message} />
    return [routerPrompt, () => setDirty(true), () => setDirty(false)]

}

export default UnSaveChangedWarning