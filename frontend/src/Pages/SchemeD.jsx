import React from 'react'
import schemed1 from '../assets/Scheme D image 1.png'
import schemed2 from '../assets/Scheme D image 2.png'
import { Container } from '../components'
import Section from '../components/container/Section'

const SchemeD = () => {
    return (
        <Section>
            <div className="mt-6 space-y-6">
                {/* First image */}
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
