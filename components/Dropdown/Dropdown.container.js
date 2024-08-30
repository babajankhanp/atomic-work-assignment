import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import { useClickOutside } from '@/hooks';

const DropdownContainer = ({ url, searchExternal = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useClickOutside(dropdownRef, toggleDropdown);

  useEffect(() => {
    if (isOpen && url) {
      fetchOptions();
    }
  }, [isOpen]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }

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
      try {
        const response = await fetch(`${url}?search=${value}`);
        const data = await response.json();
        setFilteredOptions(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
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
    setSearchTerm('');
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        if (focusedIndex >= 0) {
          handleSelect(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        toggleDropdown();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
      searchInputRef.current?.setAttribute('aria-activedescendant', `option-${focusedIndex}`);
    }
  }, [focusedIndex, filteredOptions]);

  return (
    <Dropdown
      selectedOption={selectedOption}
      toggleDropdown={toggleDropdown}
      dropdownRef={dropdownRef}
      searchInputRef={searchInputRef}
      isOpen={isOpen}
      handleSearch={handleSearch}
      handleSelect={handleSelect}
      handleKeyDown={handleKeyDown}
      searchTerm={searchTerm}
      filteredOptions={filteredOptions}
      focusedIndex={focusedIndex}
    />
  );
};

export default DropdownContainer;
