import { 
    Box, 
    Image, 
    Text, 
    HStack, 
    IconButton, 
    Heading,
    VStack, 
    Button,
    useColorModeValue, 
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    Input,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    ModalCloseButton, } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { useState } from "react";

export default function ProductCard({ product }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct, updateProduct } = useProductStore();

    const [updatedProduct, setUpdatedProduct] = useState(product)

    const toast = useToast();

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();

       if (!success) {
         toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true
         })
       } else {
         toast({
            title: 'Success',
            description: message,
            status: 'success',
            duration: 3000,
            isClosable: true
         })
       }

    }

    const handleDeleteProduct = async (pid) => {
       const {success, message} = await deleteProduct(pid);
        

       if (!success) {
         toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true
         })
       } else {
         toast({
            title: 'Success',
            description: message,
            status: 'success',
            duration: 3000,
            isClosable: true
         })
       }
    }

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight='bold' fontSize='x1' color={textColor}  mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton onClick={onOpen} icon={<CiEdit />} colorScheme="blue"/>   
                    <IconButton icon={<FaRegTrashAlt />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red"/>
                </HStack>   
            </Box>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Update product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input 
                                placeholder='Price'
                                name='price'
                                value={updatedProduct.price}
                                 onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input 
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                 onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            update 
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
        </Box>
    )
} 