import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { ALL_COUNTRIES } from '../config';
import { Controls } from '../components/Controls';
import { List } from '../components/List';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';

export const HomePage = ({ countries, setCountries }) => {
	const [filteredCountries, setFilteredCountries] = useState(countries);

	const { push } = useHistory(); //* push - метод для перехода по страницам

	const handleSearch = (search, region) => {
		let data = [...countries];

		if (region) data = data.filter((c) => c.region.includes(region));

		if (search) data = data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

		setFilteredCountries(data);
	};

	useEffect(() => {
		if (!countries.length) axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		handleSearch();
		// eslint-disable-next-line
	}, [countries]);

	return (
		<>
			<Controls onSearch={handleSearch} />
			{!filteredCountries.length ? (
				<Loading />
			) : (
				<List>
					{filteredCountries.map((c) => {
						const countryInfo = {
							img: c.flags.png,
							name: c.name,
							info: [
								{ title: 'Population', description: c.population.toLocaleString() },
								{ title: 'Region', description: c.region },
								{ title: 'Capital', description: c.capital },
							],
						};

						return (
							<Card
								key={c.name}
								onClick={() => push(`/country/${c.name}`)}
								{...countryInfo}
							/>
						);
					})}
				</List>
			)}
		</>
	);
};
