/**
Author - Babajan
Git - https://github.com/babajankhanp
* */

import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';

import Dropdown from './Dropdown';
import {
  useClickOutside,
  useDebounce,
  useUniqueRef,
 } from '@/hooks';

const DropdownContainer = ({
  url,
  searchExternal = false,
  id,
  isOpen,
  setIsOpen
 }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  const dropdownRef = useRef(null);
  const optionsRefs = useRef([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

console.log(isOpen,"from ",id)
  useClickOutside(dropdownRef,toggleDropdown)

  useEffect(() => {
    if (isOpen && url && !searchTerm) {
      fetchOptions();
    }
  }, [isOpen, searchTerm]);

    useEffect(() => {
    if (debouncedSearchTerm &&  searchExternal && searchTerm) {
      handleExternalSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);


  function toggleDropdown(){
    setIsOpen(!isOpen);
  };

  const fetchOptions = async () => {
    try {
      setIsLoading(true)
       const response = await fetch(url);
      const data = await response.json();
      setOptions(data);
      setFilteredOptions(data);
      setIsLoading(false)
    } catch (error) {
       setIsLoading(false)
      console.error('Error fetching dropdown options:', error);
    }
  };

  const handleSearch = async (e) => {
    (e) => e.stopPropagation()
    const value = e.target.value;
      setSearchTerm(value);
    if (searchExternal) {
       setSearchTerm(value);
    } else {
      // Filter options internally
     const normalizedSearchTerm = value.replace(/\s+/g, '').toLowerCase();
        const filtered = options?.filter((option) => {
            const normalizedOption = option?.name.replace(/\s+/g, '').toLowerCase();
            return normalizedOption.includes(normalizedSearchTerm);
        });
      setFilteredOptions(filtered);
    }
  };

    const handleExternalSearch = async (value) => {
    try {
        const response = await fetch(`${url}?search=${value}`);
        const data = await response.json();
        setFilteredOptions(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
  };

  const handleSelect = (option) => {
    setSelectedOption([option]);
    toggleDropdown();
  };

   const handleKeyDown = (e) => {
    const { key } = e;
    const currentIndex = optionsRefs.current.findIndex(
      (ref) => ref && ref === document.activeElement
    );

    switch (key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < filteredOptions.length - 1) {
          optionsRefs.current[currentIndex + 1]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          optionsRefs.current[currentIndex - 1]?.focus();
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (currentIndex >= 0) {
          handleSelect(filteredOptions[currentIndex]);
        }
        break;
      case ' ':
       if(document.activeElement === dropdownRef.current){
         setIsOpen(false);
       }
        break;
      default:
        break;
    }
  };


  return (
    <Dropdown
    selectedOption ={selectedOption}
    toggleDropdown = {toggleDropdown}
    dropdownRef={dropdownRef}
    isOpen = {isOpen}
    handleKeyUp = {handleKeyDown}
    optionsRefs={optionsRefs}
    handleSearch = {handleSearch}
    handleSelect={handleSelect}
    searchTerm ={searchTerm}
    isLoading={isLoading}
    filteredOptions ={filteredOptions}
     />
  );
};

export default DropdownContainer;
