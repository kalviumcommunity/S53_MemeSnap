import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import "../App.css";
import axios from 'axios';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const Mainpage = () => {
    const [memes, setMemes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMeme, setSelectedMeme] = useState(null);
    const [imageLink, setImageLink] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState('');
    const [update, setUpdate] = useState('');
    const [updatedImageLink, setUpdatedImageLink] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedUser, setUpdatedUser] = useState('');

    function renderRow(props) {
        const { index, style } = props;
        if (!selectedMeme || !selectedMeme.comments || index >= selectedMeme.comments.length) {
            return null;
        }
        const comment = selectedMeme.comments[index];
        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemText primary={`@${comment.user}: ${comment.comment}`} />
                </ListItemButton>
            </ListItem>
        );
        }
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const checkedIconStyle = {
        color: 'red', // Change color to any desired color
    };

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await axios.get("https://memesnap.onrender.com/api/data");
                setMemes(response.data.data);
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchMemes();
    }, []);

    const MemeCard = ({ meme }) => {
        const [isHovering, setIsHovering] = useState(false);
        const openMeme = () => {
            setSelectedMeme(meme); // Set the selected meme when clicked
        }

        return (
            <div className="meme-card" key={meme._id} onClick={openMeme}>
                <div className='layer-1' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <img className="meme-image" src={meme.image} alt="Meme"/>
                </div>
                <div className='details-1' style={{ display: isHovering ? 'block' : 'none' }}>
                    <p className='username'>@{meme.user}</p>
                    <p className="title">{meme.memeTitle}</p>
                </div>
            </div>
        );
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeMeme = () =>{
        setSelectedMeme(null);
    } 

    const closeEdit = () =>{
        setUpdate(null);
    }
    const openEdit = (meme) => {
        setUpdate(meme); // Set the selected meme when clicked
    }

    const handleCreate = async () => {
        try {
            const newMeme = {
                memeId: Date.now(), // Generate a unique ID for the meme
                memeTitle: description, // Assuming description is the title
                user: user, // Update with actual user data
                image: imageLink,
                likes: 0,
                comments: [],
                tags: "" // Add tags if needed
            };

            // Send POST request to create new meme
            await axios.post("https://memesnap.onrender.com/api/create", newMeme);

            // Refresh memes after creation
            const response = await axios.get("https://memesnap.onrender.com/api/data");
            setMemes(response.data.data);

            closeModal();
        } catch (error) {
            console.log("error: ", error);
        }
    };
    const handleUpdate = async () => {
        try {
            console.log("Updated User:", updatedUser); // Log the updatedUser state
        console.log("Updated Image Link:", updatedImageLink);
            const updatedMeme = {
                _id: selectedMeme._id, 
                memeTitle: updatedDescription, // Assuming description is the title
                user: updatedUser, // Update with actual user data
                image: updatedImageLink,
            };

            // Send PUT request to update a meme
            await axios.put(`https://memesnap.onrender.com/api/update/${selectedMeme._id}`, updatedMeme);

            // Refresh memes after creation
            const response = await axios.get("https://memesnap.onrender.com/api/data");
            setMemes(response.data.data);

            closeEdit();
        } catch (error) {
            console.log("error: ", error);
        }
    };

    return (
        <>
            <div className='container'>
                <Navbar />
                <div className='add'>
                    <button className='create' onClick={openModal}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 0C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3L0 21C0 21.7956 0.316071 22.5587 0.87868 23.1213C1.44129 23.6839 2.20435 24 3 24H21C21.7956 24 22.5587 23.6839 23.1213 23.1213C23.6839 22.5587 24 21.7956 24 21V3C24 2.20435 23.6839 1.44129 23.1213 0.87868C22.5587 0.316071 21.7956 0 21 0L3 0ZM12.75 6.75V11.25H17.25C17.4489 11.25 17.6397 11.329 17.7803 11.4697C17.921 11.6103 18 11.8011 18 12C18 12.1989 17.921 12.3897 17.7803 12.5303C17.6397 12.671 17.4489 12.75 17.25 12.75H12.75V17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25V12.75H6.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12C6 11.8011 6.07902 11.6103 6.21967 11.4697C6.36032 11.329 6.55109 11.25 6.75 11.25H11.25V6.75C11.25 6.55109 11.329 6.36032 11.4697 6.21967C11.6103 6.07902 11.8011 6 12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75Z" fill="#fff"/>
                        </svg>
                        Create
                    </button>
                </div>
                <div className='Suggestions'>
                    <p id="sgst">Suggestions</p>
                    <button id='sgst-btn'>Technology</button>
                    <button id="sgst-btn">Gaming</button>
                    <button id="sgst-btn">Relationships</button>
                    <button id="sgst-btn">Sports</button>
                </div>
                <div className='filters'>
                    <button id="filter-btn">Pop Culture</button>
                    <button id="filter-btn">Animals and Pets</button>
                    <button id="filter-btn">Food</button>
                    <button id="filter-btn">Technology</button>
                    <button id="filter-btn">Gaming</button>
                    <button id="filter-btn">Relationships</button>
                    <button id="filter-btn">Sports</button>
                    <button id="filter-btn">School</button>
                    <button id="filter-btn">Corporate</button>
                </div>
            </div>
            <div className='meme-container'>
                {memes.map((meme) => (
                    <MemeCard key={meme._id} meme={meme}/>
                ))}
            </div>
            {selectedMeme && (
                <div className="modal-container">
                    <div className="modal">
                        <div className="meme-content">
                            <div className="meme-close" onClick={closeMeme}>
                                <svg width="55" height="55" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="68" height="68" rx="34" fill="white"/>
                                    <path d="M34.0001 50.6786C29.5768 50.6786 25.3346 48.9214 22.2069 45.7937C19.0792 42.666 17.322 38.4238 17.322 34.0005C17.322 29.5773 19.0792 25.3351 22.2069 22.2074C25.3346 19.0797 29.5768 17.3225 34.0001 17.3225C38.4233 17.3225 42.6655 19.0797 45.7932 22.2074C48.9209 25.3351 50.6781 29.5773 50.6781 34.0005C50.6781 38.4238 48.9209 42.666 45.7932 45.7937C42.6655 48.9214 38.4233 50.6786 34.0001 50.6786ZM34.0001 53.0612C39.0552 53.0612 43.9034 51.053 47.4779 47.4784C51.0525 43.9039 53.0607 39.0557 53.0607 34.0005C53.0607 28.9454 51.0525 24.0972 47.4779 20.5227C43.9034 16.9481 39.0552 14.9399 34.0001 14.9399C28.9449 14.9399 24.0967 16.9481 20.5222 20.5227C16.9476 24.0972 14.9395 28.9454 14.9395 34.0005C14.9395 39.0557 16.9476 43.9039 20.5222 47.4784C24.0967 51.053 28.9449 53.0612 34.0001 53.0612Z" fill="black"/>
                                    <path d="M24.4697 33.9989C24.4697 33.683 24.5952 33.3799 24.8186 33.1565C25.0421 32.9331 25.3451 32.8076 25.661 32.8076H42.339C42.655 32.8076 42.958 32.9331 43.1814 33.1565C43.4048 33.3799 43.5303 33.683 43.5303 33.9989C43.5303 34.3149 43.4048 34.6179 43.1814 34.8413C42.958 35.0647 42.655 35.1902 42.339 35.1902H25.661C25.3451 35.1902 25.0421 35.0647 24.8186 34.8413C24.5952 34.6179 24.4697 34.3149 24.4697 33.9989Z" fill="black"/>
                                </svg>
                            </div>
                            <div className='left'>
                                <div className='meme-modal-img'>
                                    <img src={selectedMeme.image} alt="Meme" />
                                </div>
                                <div className='put-method'>
                                    <button className='put-trigger-btn' onClick={openEdit}>Edit</button>
                                </div>
                            </div>
                            <div className='right'>
                                <div className='line-1'>
                                    <div className='meme-modal-heading'>
                                        <p>{selectedMeme.memeTitle}</p>
                                    </div>
                                    <div className='share'>
                                        <button className='share-btn'>Share</button>
                                    </div>
                                </div>
                                <div className='line-2'>
                                    <p>@{selectedMeme.user}</p>
                                </div>
                                <div className='line-3'>
                                    <p>Comments</p>
                                </div>
                                <div className='line-4'>
                                <Box sx={{ width: '100%', height: 150, maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <FixedSizeList
                                        height={150}
                                        width={360}
                                        itemSize={46}
                                        itemCount={10}
                                        overscanCount={5}>
                                        {renderRow}
                                    </FixedSizeList>
                                </Box>
                                </div>
                                <div className='line-5'>
                                <Checkbox
                                    {...label}
                                    icon={<FavoriteBorder style={checkedIconStyle} />}
                                    checkedIcon={<Favorite style={checkedIconStyle} />}
                                />
                                </div>
                                <hr/>
                                <div className='comment'>
                                    <input type="text" placeholder="Comment here" onChange={(e) => setUser(e.target.value)} className='comment-input'></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                        {update && (
                <div className='modal-container'>
                    <div className="modal">
                        <div className="modal-content">
                            <div className="close" onClick={closeEdit}><svg width="42" height="42" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="68" height="68" rx="34" fill="white"/>
    <path d="M34.0001 50.6786C29.5768 50.6786 25.3346 48.9214 22.2069 45.7937C19.0792 42.666 17.322 38.4238 17.322 34.0005C17.322 29.5773 19.0792 25.3351 22.2069 22.2074C25.3346 19.0797 29.5768 17.3225 34.0001 17.3225C38.4233 17.3225 42.6655 19.0797 45.7932 22.2074C48.9209 25.3351 50.6781 29.5773 50.6781 34.0005C50.6781 38.4238 48.9209 42.666 45.7932 45.7937C42.6655 48.9214 38.4233 50.6786 34.0001 50.6786ZM34.0001 53.0612C39.0552 53.0612 43.9034 51.053 47.4779 47.4784C51.0525 43.9039 53.0607 39.0557 53.0607 34.0005C53.0607 28.9454 51.0525 24.0972 47.4779 20.5227C43.9034 16.9481 39.0552 14.9399 34.0001 14.9399C28.9449 14.9399 24.0967 16.9481 20.5222 20.5227C16.9476 24.0972 14.9395 28.9454 14.9395 34.0005C14.9395 39.0557 16.9476 43.9039 20.5222 47.4784C24.0967 51.053 28.9449 53.0612 34.0001 53.0612Z" fill="black"/>
    <path d="M24.4697 33.9989C24.4697 33.683 24.5952 33.3799 24.8186 33.1565C25.0421 32.9331 25.3451 32.8076 25.661 32.8076H42.339C42.655 32.8076 42.958 32.9331 43.1814 33.1565C43.4048 33.3799 43.5303 33.683 43.5303 33.9989C43.5303 34.3149 43.4048 34.6179 43.1814 34.8413C42.958 35.0647 42.655 35.1902 42.339 35.1902H25.661C25.3451 35.1902 25.0421 35.0647 24.8186 34.8413C24.5952 34.6179 24.4697 34.3149 24.4697 33.9989Z" fill="black"/>
    </svg>
                            </div>
                            <div className='Heading'>
                                <p>Edit Meme</p>
                            </div>
                            <div className='img-link'>
                                <input type="text" placeholder="User-name" value={updatedUser} onChange={(e) => setUpdatedUser(e.target.value)} />
                            </div>
                            <div className='img-link'> 
                                <input type="text" placeholder="Image Link" value={updatedImageLink} onChange={(e) => setUpdatedImageLink(e.target.value)} />
                            </div>
                            <div className='descrip'>
                                <input type="text" placeholder="Description" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
                            </div>
                            <div className='add-btn'>
                                <button className= 'add-button' onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
                <div className="modal-container">
                    <div className="modal">
                        <div className="modal-content">
                            <div className="close" onClick={closeModal}><svg width="42" height="42" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="68" height="68" rx="34" fill="white"/>
<path d="M34.0001 50.6786C29.5768 50.6786 25.3346 48.9214 22.2069 45.7937C19.0792 42.666 17.322 38.4238 17.322 34.0005C17.322 29.5773 19.0792 25.3351 22.2069 22.2074C25.3346 19.0797 29.5768 17.3225 34.0001 17.3225C38.4233 17.3225 42.6655 19.0797 45.7932 22.2074C48.9209 25.3351 50.6781 29.5773 50.6781 34.0005C50.6781 38.4238 48.9209 42.666 45.7932 45.7937C42.6655 48.9214 38.4233 50.6786 34.0001 50.6786ZM34.0001 53.0612C39.0552 53.0612 43.9034 51.053 47.4779 47.4784C51.0525 43.9039 53.0607 39.0557 53.0607 34.0005C53.0607 28.9454 51.0525 24.0972 47.4779 20.5227C43.9034 16.9481 39.0552 14.9399 34.0001 14.9399C28.9449 14.9399 24.0967 16.9481 20.5222 20.5227C16.9476 24.0972 14.9395 28.9454 14.9395 34.0005C14.9395 39.0557 16.9476 43.9039 20.5222 47.4784C24.0967 51.053 28.9449 53.0612 34.0001 53.0612Z" fill="black"/>
<path d="M24.4697 33.9989C24.4697 33.683 24.5952 33.3799 24.8186 33.1565C25.0421 32.9331 25.3451 32.8076 25.661 32.8076H42.339C42.655 32.8076 42.958 32.9331 43.1814 33.1565C43.4048 33.3799 43.5303 33.683 43.5303 33.9989C43.5303 34.3149 43.4048 34.6179 43.1814 34.8413C42.958 35.0647 42.655 35.1902 42.339 35.1902H25.661C25.3451 35.1902 25.0421 35.0647 24.8186 34.8413C24.5952 34.6179 24.4697 34.3149 24.4697 33.9989Z" fill="black"/>
</svg>
                            </div>
                            <div className='Heading'>
                                <p>Create New Meme</p>
                            </div>
                            <div className='img-link'>
                                <input type="text" placeholder="User-name" value={user} onChange={(e) => setUser(e.target.value)} />
                            </div>
                            <div className='img-link'> 
                                <input type="text" placeholder="Image Link" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
                            </div>
                            <div className='descrip'>
                                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className='add-btn'>
                                <button className= 'add-button' onClick={handleCreate}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Mainpage;