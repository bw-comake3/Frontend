import {useState} from 'react';


export default function useInput(initValue) {
    const [input, setInput] = useState(initValue) 
    const handleChange = (updatedValue => setInput(updatedValue))
    return [input, setInput, handleChange]
}
