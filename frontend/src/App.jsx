import { Box, useColorModeValue } from "@chakra-ui/react"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useProductStore } from "./store/product"

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create-product" element={<CreatePage />}/>
      </Routes>
    </Box>
  )
}

export default App
