import React, { useState } from 'react'
import schemed1 from '../assets/Scheme D image 1.png'
import schemed2 from '../assets/Scheme D image 2.png'
import { Container } from '../components'
import Section from '../components/container/Section'

const SchemeD = () => {
    const [selectedImage, setSelectedImage] = useState('both');

    return (
        <Section>
            <div className="mt-9">
                <div className="flex justify-between items-center mb-4">
                    <h1 className='ml-5'>
                        Last Updated Date : <strong>12/12/2024</strong>
                    </h1>
                    <div className="flex space-x-2">

                        <button 
                            onClick={() => setSelectedImage('a')}
                            className={`px-2 py-18  ${
                                selectedImage === 'a' 
                                    ? 'bg-beige text-white' 
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Demo (1 CR)
                        </button>
                        <button 
                            onClick={() => setSelectedImage('b')}
                            className={`px-2 py-18  ${
                                selectedImage === 'b' 
                                    ? 'bg-beige text-white' 
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Batch 1
                        </button>
                        <button 
                            onClick={() => setSelectedImage('batch 2')}
                            className={`px-2  py-18  ${
                                selectedImage === 'batch 2' 
                                    ? 'bg-beige  text-white' 
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Batch 2
                        </button>
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
                    <h1 className='text-center text-2xl'>Strategy to be live from 16th Dec, 2024</h1>
                )}
            </div>
        </Section>
    )
}

export default SchemeD