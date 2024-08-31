/**
Author - Babajan
Git - https://github.com/babajankhanp
* */

import React from "react";
import styled from "styled-components";

const Dropdown = ({
	selectedOption,
	isLoading,
	dropdownRef,
	handleKeyDown,
	optionsRefs,
	toggleDropdown,
	isOpen,
	handleSearch,
	handleSelect,
	searchTerm,
	filteredOptions,
	dropdownKey,
	label
}) => {
	return (
		<DropdownSection>
		<DropdownContainer
		        id={dropdownKey}
		        ref={dropdownRef}
				onClick={toggleDropdown}
				tabIndex={0}
				role="button"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-labelledby="dropdown-header-label"
				aria-controls="dropdown-listbox"
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						toggleDropdown();
					}
				}}
				>
				<DropdownTitleWithAestrick>
				{label} <span>*</span>
				</DropdownTitleWithAestrick>
			<DropdownWrapper
			>
				<DropdownHeader id="dropdown-header-label">
					{
						selectedOption?.length > 0 ? selectedOption?.[0]?.name : "Select an option"
					}
					<Chevron
						open={isOpen}
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
					<DropdownMenuContainer
					 >
						<SearchInput
							type="text"
							placeholder="Search..."
							autoFocus={true}
							value={searchTerm}
							onChange={handleSearch}
							aria-placeholder="Search options"
							aria-label="Search options"
							onClick={(e) => e.stopPropagation()}
						/>
						<DropdownMenu
							isOpen={isOpen}
							aria-expanded={isOpen}
							id="dropdown-listbox"
							role="listbox"
							aria-labelledby="dropdown-header-label"
						>
							{
								isLoading ? <Loader>Loading...</Loader> :
								filteredOptions?.length > 0 ? (
								filteredOptions?.map((option) => (
									<DropdownItem
										key={option.id}
										selected={option === selectedOption}
										onClick={() => handleSelect(option)}
										ref={(item) => (optionsRefs.current[option.id] = item)}
										tabIndex={0}
										role="option"
										onKeyDown={handleKeyDown}
										aria-selected={option === selectedOption}
									>
										{option?.name}
									</DropdownItem>
								))
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

		</DropdownSection>
	);
};
const DropdownSection = styled.div`
    display: flex;
	flex-direction: column;
`;

const DropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const DropdownTitleWithAestrick = styled.span`
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 1rem;
  padding-top: 0.5rem;
  position: relative;

  span {
	color: red;
	font-weight: bold;
	margin-left: 5px;
  }
`;

const DropdownWrapper = styled.div`
	position: relative;
	width: 36rem;
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

const Icons = styled.div`
    display: flex;
    align-items: center;
	gap: 1rem;
`;

const Loader = styled.div`
    display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	height: 10rem;
	color:rgb(107, 72, 148) ;
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
	z-index: 1;
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
	padding: 2px;
	transition: transform 0.3s ease;
	transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownItem = styled.li`
	padding: 10px;
	cursor: pointer;
	color: black;
	margin: 0px 4px;
	text-align: start;
	background-color: ${(props) => (props.selected ? "#f5e9fc" : "#fff")};
	border-radius: 5px;

	&:hover {
		background-color: #f5e9fc;
		border-radius: 5px;
	}
	&:focus {
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
