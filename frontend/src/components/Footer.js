import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        {/* Your main content */}
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
