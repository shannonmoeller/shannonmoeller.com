import { Router, static as serve } from 'express';
import { resolve } from 'path';

const options = {
	maxAge: process.env.NODE_ENV === 'development'
		? 0
		: '1d',
};

export function getStatic(path) {
	return serve(resolve(__dirname, path), options);
}

export function routeStatic() {
	return Router()
		.use(getStatic('../../client'));
}
