"use client"  // makes app client-sided

import Image from "next/image";
import {useState, useEffect} from "react";
import {firestore} from "@/firebase";
import {Box, Button, Modal, Typography, Stack, TextField} from "@mui/material" 
import { query, collection, getDocs, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);  // default inventory to empty array, changes when setInventory called
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {   // async prevents site from freezing while making queries
    const snapshot = query(collection(firestore, "inventory"));   // run query to get firestore's inventory DB
    const docs = await getDocs(snapshot); // individual documents within inventory (such as boxes)
    let inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      });
    });
    setInventory(inventoryList);
  }

  // helper function to remove items
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item); // get document reference of the inventory document and a specified item
    const docSnap = await getDoc(docRef);   // 

    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);    // if the quantity is 1, just delete the whole collection
      } else {
        await setDoc(docRef, {quantity: quantity - 1})  // else just decrement the quantity by 1
      }
    }
    await updateInventory();  // once the changes to quantity have been made, reload the inventory on the UI
  }

  // helper to add 
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item); // get document reference of the inventory document and a specified item
    const docSnap = await getDoc(docRef);   // 

    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity + 1})  // increment an existing document by 1
    } else {
      await setDoc(docRef, {quantity: 1});
    }
    await updateInventory();  // once the changes to quantity have been made, reload the inventory on the UI
  }

  useEffect(() => {   // call updateInventory on initial page load
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flex-direction="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box 
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flex-direction="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)"
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Button
              variant="outlined" 
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
        }}
      >
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box width="800px" height="100px" bgcolor="#ADD8E6">Inventory</Box>
      </Box>
    </Box>
  )
}
