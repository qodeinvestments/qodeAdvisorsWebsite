import React from 'react'
import schemed1 from '../assets/Scheme D image 1.png'
import schemed2 from '../assets/Scheme D image 2.png'
import { Container } from '../components'
import Section from '../components/container/Section'

const SchemeD = () => {
    return (
        <Section>
            <div className="mt-9">
                {/* First image */}
                <h1 className='ml-5'>
                    Last Updated Date : <strong>12/12/2024</strong>
                </h1>
                <img
                    src={schemed1}
                    alt="Scheme D Image 1"
                    className="w-full h-auto object-contain"
                />
                {/* Second image */}
                <img
                    src={schemed2}
                    alt="Scheme D Image 2"
                    className="w-full h-auto object-contain"
                />
            </div>
        </Section>
    )
}

export default SchemeD
