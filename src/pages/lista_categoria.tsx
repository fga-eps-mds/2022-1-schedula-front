import { Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';

const lista_categoria: NextPage = () => {

    return(
        <div style = {{margin: '55px'}}>
            <div style = {{boxSizing: 'border-box', borderBottom: '1px solid', width: '360px', height: '60px'}}>
                <Heading width={210} height={51} margin = '0 auto' size='xl' textAlign='center'>Schedula</Heading>
            </div>
        </div>
    );
}

export default lista_categoria