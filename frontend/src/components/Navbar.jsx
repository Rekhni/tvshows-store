import { Container, Flex, Button, HStack, Text, useColorMode } from "@chakra-ui/react"
import { CiSquarePlus } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { useProductStore } from "../store/product";



const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
            >
                <Link to={"/"}>TV-shows store 🛒</Link>
            </Text>
            <HStack>
                <Link to={"/create-product"}>
                    <Button>
                        <CiSquarePlus size={30}/>
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon /> : <IoMdSunny size={20}/>}
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar;