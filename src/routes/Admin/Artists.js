import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteArtist, getAllArtists } from '../../backend/helpers/artist';
import { isAuthenticated } from '../../backend/helpers/auth';
import Table from '../../components/commons/Table';
import Layout from '../../components/layouts/Admin/Layout';
import { artistsHeadCells } from '../../utils/headCells';

function Artists(props) {

	const [status, setStatus] = useState({
		error: false,
		success: false,
		msg: "",
	});

	const [allArtists, setAllArtists] = useState([]);

	const [searchText, setSearchText] = useState("");

	const searchResult = searchText && allArtists.filter((each) => {
		return (
			(each.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
		)
	});

	// fetch and load all artists
	const preload = () => {
		getAllArtists().then((resp) => {
			if (!resp || resp.error) {
				setStatus({
					error: true,
					success: false,
					msg: (resp && resp.error) || "There is an error."
				})
			} else {
				setAllArtists(resp.artists.map((each) => {
                    return {
                        ...each,
                        action: (
                            <>
                                <Link to={`/admin/artists/edit/${each.id}`} className="button icon-button button-primary2 text-white mr-2 p-1">
                                    <i className="far fa-edit"></i>
                                </Link>
                                <button className="button icon-button button-error p-1" onClick={onDelete(each.id)}><i className="far fa-trash-alt"></i></button>
                            </>
                        )
                    }
                }));
			}
		})
	}

	// Message Component
	const message = () => (
		(status.error && <p className="alert w-100 text-center alert-danger">{status.msg}</p>)
		|| (status.success && <p className="alert w-100 text-center alert-success">{`${status.msg} !`}</p>)
	)

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	}

	const onDelete = (id) => {

		const token = isAuthenticated() && isAuthenticated().token;

		if (!token) {
			return () => {
				setStatus({
					error: true,
					success: false,
					msg: "Login Session Expired!"
				})
			};
		}

		return ((e) => {
			// e.preventDefault();
			deleteArtist({ id }, token).then((resp) => {

				console.log('====================================');
				console.log(id, resp);
				console.log('====================================');

				if (!resp || resp.error) {
					setStatus({
						error: true,
						success: false,
						msg: resp.error || "There is an error."
					})
				} else {
					setStatus({
						error: false,
						success: true,
						msg: resp.msg
					})
					preload();
				}
			})
		})
	}


	const TR = (row, index) => (
		<tr key={index}>
			<th className="text-grey" scope="row">{index + 1}</th>
			<td className="text-grey">{row.name}</td>
			<td className="text-grey" style={{ width: "40%" }}>{row.description}</td>
			<td>
				<Link to={`/admin/artists/edit/${row.id}`} className="button button-primary2 text-white mr-2 p-0">
					<i className="far fa-edit"></i>
				</Link>
				<button className="button button-error p-0" onClick={onDelete(row.id)}><i className="far fa-trash-alt"></i></button>
			</td>
		</tr>
	)

	const Search = () => (
		<input
			type="text"
			className="input input-primary2 border py-3 mb-3 border-primary1"
			placeholder="Search Artist"
			value={searchText}
			onChange={handleSearch}
		/>
	)

	const artistTable = () => (
		<table className="table table-hover text-center">
			<thead>
				<tr>
					<th scope="col" className="text-capitalize">#</th>
					<th scope="col" className="text-capitalize">name</th>
					<th scope="col" className="text-capitalize">description</th>
					<th scope="col" className="text-capitalize">timestamp</th>
				</tr>
			</thead>
			<tbody>
				{
					searchText && searchText.length
						? (
							searchResult.length
								? searchResult.map(TR)
								: <td className="text-grey" colSpan={4}><i class="fas fa-exclamation-triangle text-danger mr-2"></i> No Records Found</td>
						)
						: (
							allArtists.length
								? allArtists.map(TR)
								: <td className="text-grey" colSpan={4}><i class="fas fa-exclamation-triangle text-danger mr-2"></i> No Records Found</td>
						)

				}
			</tbody>
		</table>
	)


	useEffect(() => {
		preload()
	}, [])

	//auto remove msg
	useEffect(() => {
		(status.error || status.success) && setTimeout(() => {
			setStatus({
				error: false,
				success: false,
				msg: "",
			});
		}, 3000)
	}, [status.error, status.success])


	return (
		<Layout title="Artists">
			{/* {Search()} */}
			{message()}
			{/* {artistTable()} */}
			<Table
				title="Artists"
				columns={artistsHeadCells}
				tableData={allArtists}
			/>
		</Layout>
	);
}

export default Artists;