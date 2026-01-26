import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	layout("layouts/layout.tsx", [
		index("routes/home.tsx"),
		route("team", "routes/team.tsx"),
		route("projects", "routes/projects.tsx"),
		route("calendar", "routes/calendar.tsx"),
		route("documents", "routes/documents.tsx"),
		route("reports", "routes/reports.tsx"),
		route("profile", "routes/profile.tsx"),
		route("teams/heroicons", "routes/teams.heroicons.tsx"),
		route("teams/tailwind-labs", "routes/teams.tailwind-labs.tsx"),
		route("teams/workcation", "routes/teams.workcation.tsx"),
	]),
] satisfies RouteConfig;
