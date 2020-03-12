import React, { useState } from 'react';


const OpinionsForm = (params) =>{
	const [nameOpinion, setNameOpinion] = useState("");
	const [resumeOpinion, setResumeOpinion] = useState("")
	const [pointOpinion, setPointOpinion] = useState("")
	const [nameEmpresa, setEmpresaName] = useState("")
	
	const handleChangeName = (e) => {
		setNameOpinion(e.target.value);
	}
	
	const handleChangeResume = (e) => {
		setResumeOpinion(e.target.value)
	}

	const handleChangePoint = (e) => {
		setPointOpinion(e.target.value)
	}

	const handleChangeEmpresa = (e) => {
		setEmpresaName(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		params.addListItem({
			name: nameOpinion, 
			resume: resumeOpinion, 
			points: pointOpinion, 
			empresa: nameEmpresa
		});
		setNameOpinion("");
		setResumeOpinion("")
		setEmpresaName("")
	}

	return (
		<form onSubmit={handleSubmit} className="my-3 text-left" >
			<div className="form-group">
				<div className="form-row">
					<div className="form-group col-md-8">
						<label htmlFor="NameOpinion">Titulo de la opinion</label>
						<input
							id="NameOpinion"
							type="text"
							onChange={handleChangeName}
							value={nameOpinion}
							name="nameOpinion"
							className="form-control"
							placeholder="Add title here..."
							aria-label="Add title here..."
						/>
					</div>
					<div className="form-group col-md-4">
						<label htmlFor="inputState">Empresa</label>
						<select 
							id="inputState"
							name="selectEmpresas"
							className="form-control"
							onChange={handleChangeEmpresa}
							value={nameEmpresa}
						>
							<option defaultValue>choose ...</option>
							{params.selects.empresas.map((empresa, index) =>(
								params.selects.empresas !== undefined ? (
									<option key={index}>
										{empresa}
									</option>
								):''
							)
							)}
						</select>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="row">
					<div className="form-group col-md-4">
						<label htmlFor="inputState">Calificacion</label>
						<select 
							id="inputState" 
							name='selectPoints'
							className="form-control"
							onChange={handleChangePoint}
							value={pointOpinion}
						>
							<option defaultValue>choose ...</option>
							{params.selects.puntuaciones.map((puntuaciones, index) =>(
								params.selects.puntuaciones !== undefined ? (
									<option key={index}>
										{puntuaciones}
									</option>
								):''
							)
							)}
						</select>
					</div>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="ResumeOpinion">Descripcion</label>
				<textarea
					id="ResumeOpinion"
					onChange={handleChangeResume}
					value={resumeOpinion}
					name="resumeOpinion" 
					className="form-control"
					placeholder="Add resume here..."
					aria-label="Add resume here..."
					rows="3"
				>
				</textarea>
			</div>
			<div className="form-group">
				<button type="submit" className="btn btn-primary ml-2">
					Submit
				</button>
			</div>
		</form>
	);
}

export default OpinionsForm;