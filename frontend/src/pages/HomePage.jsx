import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product"
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxW="container.lg" py={12}>
            <VStack spacing={8}>
                <Text 
                    fontWeight={"bold"} 
                    fontSize={30} 
                    textAlign={"center"} 
                    bgClip={"text"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                >
                    Current Products 🚀
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>

                {products.length === 0 && <Text fontSize='x1' textAlign={"center"} fontWeight='bold' color='gray.500'>
                    No products found 😢{" "}
                    <Link to={"/create-product"}>
                        <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                            Create a product
                        </Text>
                    </Link>
                </Text>}
            </VStack>
        </Container>
    )
}

