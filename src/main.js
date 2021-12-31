import App from './App.svelte';
import faunadb from 'faunadb';

const db = new faunadb.Client({
    secret: process.env.SVELTE_APP_FAUNADB_SECRET, 
    domain: 'db.us.fauna.com',
});

const app = new App({
	target: document.body,
	props: {
		db: db,
		q: faunadb.query
	}
});

export default app;