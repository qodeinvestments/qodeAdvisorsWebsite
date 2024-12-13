import React from 'react'
import schemed1 from '../assets/Scheme D image 1.png'
import schemed2 from '../assets/Scheme D image 2.png'
import { Container } from '../components'
import Section from '../components/container/Section'
const SchemeD = () => {
    return (
        <Section>
            <div className='mt-6'>
                <img src={schemed1} alt="" srcset="" />
                <img src={schemed2} alt="" srcset="" />
            </div>
        </Section>
    )
}

export default SchemeD