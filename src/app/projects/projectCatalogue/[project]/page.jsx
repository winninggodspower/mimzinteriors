const ProjectDetailPage = async ({ params }) => {
  const { project } = await params;

  return (
    <main style={{ padding: "3rem 1.25rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", margin: 0 }}>Project Detail</h1>
      <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
        Dynamic route parameter: {project}
      </p>
      <p style={{ marginTop: "0.75rem", fontSize: "1rem" }}>
        Replace this placeholder with your full project detail implementation.
      </p>
    </main>
  );
};

export default ProjectDetailPage;
