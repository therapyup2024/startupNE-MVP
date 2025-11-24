import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const mappers = {

	especialista_to_professional: ({
		nome,
		email,
		senha,
		telefone,
		cpf,
		genero,
		especialidade,
		crp,
		abordagem,
		descricao,
		termos
	}) => ({
			name: nome,
            email: email,
            password: senha,
            phone: telefone && (telefone.startsWith("+")? "+"+telefone.replace(/\D/g, "") : "+55" + telefone.replace(/\D/g, "")),
            gender: genero,
            document: cpf && parseInt(cpf.replace(/\D/g, "")),
            license_number: crp,
            specialty: especialidade,
            approach: abordagem,
            description: descricao
	}),
	professional_to_especialista: ({
		name,
		email,
		password,
		phone,
		gender,
		document,
		license_number,
		specialty,
		approach,
		description,
		avatar_url,
	}) => ({
		nome: name,
		email: email,
		senha: password,
		telefone: phone,
		genero: gender,
		cpf: document,
		crp: license_number,
		especialidade: specialty,
		abordagem: approach,
		descricao: description,
		imagem: avatar_url
	}),

	cliente_to_costumer: ({
		nome,
		email,
		cpf,
		senha,
		telefone,
		genero,
		termos
	}) => ({
		name: nome,
		email: email,
		password: senha,
		phone: telefone && (telefone.startsWith("+")? "+"+telefone.replace(/\D/g, "") : "+55" + telefone.replace(/\D/g, "")),
		gender: genero,
		document: cpf && parseInt(cpf.replace(/\D/g, ""))
	}),
	costumer_to_cliente: ({
		name,
		email,
		password,
		phone,
		gender,
		document,
		avatar_url
	}) => ({
		nome: name,
		email: email,
		senha: password,
		telefone: phone,
		genero: gender,
		cpf: document,
		imagem: avatar_url
	}),
}