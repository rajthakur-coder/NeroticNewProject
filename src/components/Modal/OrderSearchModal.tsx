import React, { useState, useCallback, ReactNode } from 'react';
import BaseModal from '../BaseModals/BaseModal'; 
import SearchContentModal from '../ContentModal/SearchContentModal'; 

interface Country {
    name: string;
    code: string;
    dialCode: string;
    flag: string;
}

interface OrderSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectCountry: (country: Country) => void;
}

const OrderSearchModal: React.FC<OrderSearchModalProps> = ({
    isOpen,
    onClose,
    onSelectCountry,
}) => {
    const [headerContent, setHeaderContent] = useState<ReactNode>(null);
    const [footerContent, setFooterContent] = useState<ReactNode>(null);

    // Memoized callbacks to pass down to SearchContentModal
    const renderHeader = useCallback((content: ReactNode) => {
        setHeaderContent(content);
    }, []);

    const renderFooter = useCallback((content: ReactNode) => {
        setFooterContent(content);
    }, []);
    
    // BaseModal uses 'toggle', so we map onClose to toggle
    const toggleModal = () => onClose(); 

    return (
        <BaseModal
            isOpen={isOpen}
            toggle={toggleModal} // Mapping onClose to toggle
            header={headerContent}
            footer={footerContent}
            // Props to control Width (as requested)
            widthClass="max-w-md md:max-w-lg" // Example usage: allows control over width
        >
            <SearchContentModal
                onClose={onClose}
                onSelect={onSelectCountry}
                title="Search and Select Country" 
                renderHeader={renderHeader} // Pass state setter for header
                renderFooter={renderFooter} // Pass state setter for footer
            />
        </BaseModal>
    );
};

export default OrderSearchModal;