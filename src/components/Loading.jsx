import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
	width: 100%;
	padding-top: 20vh;
	text-align: center;
	}
`;

export const Loading = () => {
	return (
		<Wrapper>
			<h2>Loading...</h2>
		</Wrapper>
	);
};
