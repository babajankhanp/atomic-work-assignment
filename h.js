// Dropdown.js

import React from "react";
import styled from "styled-components";

const Dropdown = ({
  selectedOption,
  dropdownRef,
  toggleDropdown,
  isOpen,
  handleSearch,
  handleSelect,
  searchTerm,
  filteredOptions,
  handleKeyDown,
  highlightedIndex,
  optionRefs,
}) => {
  return (
     <DropdownContainer>
         <DropdownWrapper
          ref={dropdownRef}
          onClick={toggleDropdown}
          tabIndex={1}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="dropdown-header-label"
          aria-controls="dropdown-listbox"
         >
        <DropdownHeader>
          <span id="dropdown-header-label">
            {selectedOption || "Select an option"}
          </span>
          <Chevron
            isOpen={isOpen}
            aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
            role="button"
            aria-pressed={isOpen}
            tabIndex={0}
            onClick={toggleDropdown}
          >
            <i className="fa-solid fa-chevron-up"></i>
          </Chevron>
        </DropdownHeader>
        {isOpen && (
          <DropdownMenuContainer>
            <SearchInput
              type="text"
              placeholder="Search..."
              autoFocus={true}
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search options"
            />
            <DropdownMenu
              id="dropdown-listbox"
              role="listbox"
              aria-expanded={isOpen}
              aria-labelledby="dropdown-header-label"
              aria-activedescendant={`option-${highlightedIndex}`}
            >
              {filteredOptions?.length > 0 ? (
                filteredOptions.map((option, index) => {
                    return (
                    <DropdownItem
                    key={index}
                    selected={option === selectedOption}
                    onClick={() => handleSelect(option)}
                    tabIndex={0}
                    role="option"
                    ref={(el) => (optionRefs.current[index] = el)}
                    aria-selected={option === selectedOption}
                  >
                    {option}
                  </DropdownItem>
                    )
                })
              ) : (
                <NotFoundText
                  tabIndex={0}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {"No options found"}
                </NotFoundText>
              )}
            </DropdownMenu>
          </DropdownMenuContainer>
        )}
      </DropdownWrapper>
     </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin: 2rem;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;

  /* &:focus {
    outline: none;
  } */
`;

const DropdownHeader = styled.div`
  padding: 10px;
  background-color: #fff;
  border: 1px solid rgb(107, 72, 148);
  color: black;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus {
    outline: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  color: black;
  border: 1px solid rgb(107, 72, 148);
  border-radius: 10px;

  &:focus {
    outline: none;
  }
`;

const DropdownMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: auto;
  overflow-y: auto;
  background-color: #fff;
  padding: 4px 2px;
  padding-bottom: 4px;
  border-radius: 10px;
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const DropdownMenu = styled.ul`
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 5px;
  width: 100%;

  & > li:last-child {
    margin-bottom: 5px;
  }
`;

const Chevron = styled.span`
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  color: black;
  margin:4px;
  text-align: start;
  background-color: ${({ selected, highlighted }) =>
    selected || highlighted ? "#f5e9fc" : "#fff"};
   border-radius: 5px;

  &:hover {
    background-color: #f5e9fc;
  }
`;

const NotFoundText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

export default Dropdown;
