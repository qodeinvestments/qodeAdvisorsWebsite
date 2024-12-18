import React, { useState } from 'react'
import schemed1 from '../assets/Scheme D image 1.png'
import schemed2 from '../assets/Scheme D image 2.png'
import { Container } from '../components'
import Section from '../components/container/Section'
import Button from '../components/common/Button'

const SchemeD = () => {
    const [selectedImage, setSelectedImage] = useState('a');

    return (
        <Section>
            <div className="mt-9">
                <div className="sm:flex justify-between items-center  mb-4">
                    <h1 className='mb-2 ml-1'>
                        Last Updated Date : <strong>17/12/2024</strong>
                    </h1>
                    <div className="flex ml-1 items-center space-x-2">

                        <Button 
                            onClick={() => setSelectedImage('a')}
                            className={`px-1 py-[10px] sm:px-2 px-1 py-[10px] sm:py-18  ${
                                selectedImage === 'a' 
                                    ? 'bg-beige text-white' 
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Demo (1 CR)
                        </Button>
                        <Button 
                            onClick={() => setSelectedImage('b')}
                            className={`px-1 py-[10px] sm:px-2 px-1 py-[10px] sm:py-18  ${
                                selectedImage === 'b' 
                                    ? 'bg-beige text-white' 
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Batch 1
                        </Button>
                        <Button 
                            onClick={() => setSelectedImage('batch 2')}
                            className={`px-1 py-[10px] sm:px-2  px-1 py-[10px] sm:py-18  ${
                                selectedImage === 'batch 2' 
                                    ? 'bg-beige  text-white' 
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Batch 2
                        </Button>
                    </div>
                </div>

                {(selectedImage === 'both' || selectedImage === 'a') && (
                    <img
                        src={schemed1}
                        alt="Scheme D Image 1"
                        className={`w-full h-auto object-contain ${
                            selectedImage !== 'both' ? 'mb-4' : ''
                        }`}
                        style={{ 
                            display: selectedImage === 'both' || selectedImage === 'a' ? 'block' : 'none' 
                        }}
                    />
                )}

                {(selectedImage === 'both' || selectedImage === 'b') && (
                    <img
                        src={schemed2}
                        alt="Scheme D Image 2"
                        className={`w-full h-auto object-contain ${
                            selectedImage !== 'both' ? 'mb-4' : ''
                        }`}
                        style={{ 
                            display: selectedImage === 'both' || selectedImage === 'b' ? 'block' : 'none' 
                        }}
                    />
                )}

                {(selectedImage === 'both' || selectedImage === 'batch 2') && (
                    <h1 className='text-center text-2xl'>Strategy to be live from 18th Dec, 2024</h1>
                )}
            </div>
        </Section>
    )
}

export default SchemeD