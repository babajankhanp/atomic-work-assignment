/**
Author - Babajan
Git - https://github.com/babajankhanp
* */

import React, { useState, useEffect,useRef } from 'react';

import Dropdown from './Dropdown';
import { useClickOutside } from '@/hooks';

const DropdownContainer = ({ url, searchExternal = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef,toggleDropdown)

  useEffect(() => {
    if (isOpen && url) {
      fetchOptions();
    }
  }, [isOpen]);


  function toggleDropdown(){
    setIsOpen(!isOpen);
  };

  const fetchOptions = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setOptions(data);
      setFilteredOptions(data);
    } catch (error) {
      console.error('Error fetching dropdown options:', error);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchExternal) {
      // Fetch options from URL based on the search term
      try {
        const response = await fetch(`${url}?search=${value}`);
        const data = await response.json();
        setFilteredOptions(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      // Filter options internally
     const normalizedSearchTerm = value.replace(/\s+/g, '').toLowerCase();
        const filtered = options?.filter((option) => {
            const normalizedOption = option.replace(/\s+/g, '').toLowerCase();
            return normalizedOption.includes(normalizedSearchTerm);
        });
      setFilteredOptions(filtered);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <Dropdown
    selectedOption ={selectedOption}
    toggleDropdown = {toggleDropdown}
    dropdownRef={dropdownRef}
    isOpen = {isOpen}
    handleSearch = {handleSearch}
    handleSelect={handleSelect}
    searchTerm ={searchTerm}
    filteredOptions ={filteredOptions}
     />
  );
};

export default DropdownContainer;
