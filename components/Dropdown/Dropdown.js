import React from "react";
import styled from "styled-components";

const Dropdown = ({
	selectedOption,
	dropdownRef,
	searchInputRef,
	toggleDropdown,
	isOpen,
	handleSearch,
	handleSelect,
	handleKeyDown,
	searchTerm,
	filteredOptions,
	focusedIndex,
}) => {
	return (
		<DropdownContainer aria-hidden={true}>
			<DropdownWrapper ref={dropdownRef}>
				<DropdownHeader
					onClick={toggleDropdown}
					id="dropdown-header"
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					role="combobox"
					aria-controls="dropdown-menu"
				>
					{selectedOption || "Select an option"}
					<Chevron isOpen={isOpen}>
						<i className="fa-solid fa-chevron-up"></i>
					</Chevron>
				</DropdownHeader>
				{isOpen && (
					<DropdownMenuContainer isOpen={isOpen}>
						<SearchInput
							type="text"
							placeholder="Search..."
							autoFocus={true}
							value={searchTerm}
							onChange={handleSearch}
							onKeyDown={handleKeyDown}
							ref={searchInputRef}
							aria-placeholder="Search options"
							aria-autocomplete="list"
							aria-activedescendant={`option-${focusedIndex}`}
						/>
						<DropdownMenu
							id="dropdown-menu"
							role="listbox"
							aria-labelledby="dropdown-header"
						>
							{filteredOptions?.length > 0 ? (
								filteredOptions?.map((option, index) => (
									<DropdownItem
										id={`option-${index}`}
										key={index}
										selected={option === selectedOption}
										onClick={() => handleSelect(option)}
										tabIndex={-1}
										role="option"
										aria-selected={option === selectedOption}
										isFocused={index === focusedIndex}
									>
										{option}
									</DropdownItem>
								))
							) : (
								<NotFoundText>{"No Found"}</NotFoundText>
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
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
    margin-top: 2rem;
`;

const DropdownWrapper = styled.div`
	position: relative;
	width: 36rem;

    @media (max-width:768px){
        width: 100%;
    }
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
`;

const DropdownMenu = styled.ul`
	max-height: 200px;
	overflow-y: auto;
	list-style: none;
	padding: 0;
	margin: 0;
	margin-top: 5px;

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
	margin: 0px 4px;
	background-color: ${(props) =>
		props.selected || props.isFocused ? "#f5e9fc" : "#fff"};

	&:hover {
		background-color: #f5e9fc;
		border-radius: 5px;
	}
`;

const NotFoundText = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2px;
`;

export default Dropdown;
