import React, { useState } from 'react';

const EmpresasForm = (params) =>{
	const [nameEmpresa, setNameEmpresa] = useState("");
	const [resumeEmpresa, setResumeEmpresa] = useState("")
	
	const handleChangeName = (e) => {
		setNameEmpresa(e.target.value);
	}
	
	const handleChangeResume = (e) => {
		setResumeEmpresa(e.target.value)
	 }

	  const handleSubmit = (e) => {
		e.preventDefault();
		params.addListItem(nameEmpresa, resumeEmpresa);
		setNameEmpresa("");
		setResumeEmpresa("")
	  }

	  return (
		<form onSubmit={handleSubmit} className="my-3">
			<div className="form-group">
				<label htmlFor="NameEmpresa">Nombre de la empresa</label>
				<input
					id="NameEmpresa"
					type="text"
					onChange={handleChangeName}
					value={nameEmpresa}
					name="nameEmpresa"
					className="form-control"
					placeholder="Add text here..."
					aria-label="Add text here..."
				/>
			</div>
			<div className="form-group">
				<label htmlFor="ResumeEmpresa">Descripcion</label>
				<textarea
					id="ResumeEmpresa"
					onChange={handleChangeResume}
					value={resumeEmpresa}
					name="resumeEmpresa" 
					className="form-control" 
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

export default EmpresasForm;