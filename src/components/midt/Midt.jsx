import React, { useEffect, useRef, useState } from 'react';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import './midt.css';

const Images = ["billede0.jpg", "billede1.jpg", "billede2.jpg", "billede3.jpg", "billede4.jpg", "billede5.jpg", "billede6.jpg", "billede7.jpg", "billede8.jpg", "billede9.jpg", "billede10.jpg"]

const Midt = () => {
    const [currentIndex, setCurrectIndex] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [cursorXSpace, setCursorXSpace] = useState(0);

    const containerRef = useRef(null);
    const imagesRef = useRef(null);

    const handlePrevClick = () => {
        setCurrectIndex(currentIndex === 0 ? Images.length - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrectIndex(currentIndex === Images.length - 1 ? 0 : currentIndex + 1);
    };

    const handleDotClick = (index) => {
        setCurrectIndex(index);
    };
    /* e.touches[0].clientX  */
    const handleDragStart = (e) => {
        imagesRef.current.style.transition = "none";
        setDragging(true);
        setCursorXSpace(e.pageX ? e.pageX - imagesRef.current.offsetLeft : e.touches[0].clientX - imagesRef.current.offsetLeft)
    }

    const handleDragEnd = () => {
        setDragging(false);
        const imagesLeft = -parseInt(imagesRef.current.style.left);
        const imagesWidth = imagesRef.current.offsetWidth;

        if (imagesLeft < ((imagesWidth / 5) + (imagesWidth / 100 * 2)) * 0.5555555555555556) {
            handlePrevClick();
            const imagesLeft = -parseInt(imagesRef.current.style.left);
            imagesRef.current.style.left = `-${(imagesWidth / 5) + (imagesWidth / 100 * 2) + imagesLeft}px`;
            setTimeout(() => {
                imagesRef.current.style.transition = "0.5s";
                imagesRef.current.style.left = `-${(imagesWidth / 5) + (imagesWidth / 100 * 2)}px`;
            }, 50);

        } else if (imagesLeft > ((imagesWidth / 5) + (imagesWidth / 100 * 2)) * 1.4444444444444444) {
            handleNextClick();
            const imagesLeft = -parseInt(imagesRef.current.style.left);
            imagesRef.current.style.left = `-${imagesLeft - ((imagesWidth / 5) + (imagesWidth / 100 * 2))}px`;
            setTimeout(() => {
                imagesRef.current.style.transition = "0.5s";
                imagesRef.current.style.left = `-${(imagesWidth / 5) + (imagesWidth / 100 * 2)}px`;
            }, 50);
        } else {
            imagesRef.current.style.transition = "0.5s";
            imagesRef.current.style.left = `-${(imagesWidth / 5) + (imagesWidth / 100 * 2)}px`;
        }
        imagesRef.current.style.pointerEvents = "auto";
    }

    const handleDragMove = (e) => {
        if (!dragging) return;
        /* e.preventDefault(); */
        imagesRef.current.style.pointerEvents = "none";
 
        imagesRef.current.style.left = `${e.pageX ? e.pageX - cursorXSpace : e.touches[0].clientX - cursorXSpace}px`;
        BoundImages();
    }
    
    const BoundImages = () => {
        const container_rect = containerRef.current.getBoundingClientRect();
        const images_rect = imagesRef.current.getBoundingClientRect();
        
        if (parseInt(imagesRef.current.style.left) > 0) {
            imagesRef.current.style.left = 0;
        } else if ((images_rect.right + (images_rect.width / 100 * 2 * 4)) < container_rect.right) {
            imagesRef.current.style.left = `-${images_rect.width - container_rect.width + (images_rect.width / 100 * 2 * 4)}px`;
        }
    }
    return (
        <div className='Midt'>

            <div className="container-antal">{`${currentIndex + 1} / ${Images.length}`}</div>
            <div className="container-flex-row">
                <button onClick={handlePrevClick} className="btn"> <FiChevronLeft size={50} color={"rgb(87, 87, 87)"} /> </button>

                <div
                    className="container-slideshow"
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchEnd={handleDragEnd}
                    onTouchCancel={handleDragEnd}
                    onTouchMove={handleDragMove}
                    ref={containerRef}
                >

                    <div className="container-slideshow-images" ref={imagesRef}>
                        <div className="billede">
                            <img
                                src={require(`../../assets/${Images[currentIndex < 2 ? Images.length - 2 + currentIndex : currentIndex - 2]}`)} 
                                alt={Images[currentIndex < 2 ? Images.length - 2 + currentIndex : currentIndex - 2]} 
                            />
                        </div>
                        <div className="billede">
                            <img 
                                onClick={handlePrevClick} 
                                src={require(`../../assets/${Images[currentIndex === 0 ? Images.length - 1 : currentIndex - 1]}`)} 
                                alt={Images[currentIndex === 0 ? Images.length - 1 : currentIndex - 1]} 
                            />
                        </div>
                        <div className="billede">
                            <img 
                                src={require(`../../assets/${Images[currentIndex]}`)} 
                                alt={Images[currentIndex]} 
                            />
                        </div>
                        <div className="billede">
                            <img 
                                onClick={handleNextClick} src={require(`../../assets/${Images[currentIndex === Images.length - 1 ? 0 : currentIndex + 1]}`)} 
                                alt={Images[currentIndex === Images.length - 1 ? 0 : currentIndex + 1]} 
                            />
                        </div>
                        <div className="billede">
                            <img 
                                src={require(`../../assets/${Images[currentIndex > Images.length - 3 ? currentIndex - Images.length + 2 : currentIndex + 2]}`)} 
                                alt={Images[currentIndex > Images.length - 3 ? currentIndex - Images.length + 2 : currentIndex + 2]}
                            />
                        </div>
                    </div>
                </div>

                <button onClick={handleNextClick} className="btn"> <FiChevronRight size={50} color={"rgb(87, 87, 87)"} /> </button>
            </div>
            <div className="container-dots">
                {Images.map((_, index) => (
                    <span key={index} onClick={() => handleDotClick(index)} className={`dots ${index === currentIndex && "active"}`}></span>
                ))}
            </div>
        </div>
    )
}

export default Midt