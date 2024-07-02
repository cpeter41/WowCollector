import "./Footer.css";

export default function Footer() {
    return (
        <div id="footer">
            <span>© 2024 WowCollector</span>
            <a href="https://github.com/cpeter41/WowCollector" id="github-link">
                See this project on GitHub
            </a>
            <div id="footer-links">
                <span>Connect with me: </span>
                <a href="https://github.com/cpeter41">
                    <i className="fa-brands fa-linkedin fa-2xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/chrisspeters/">
                    <i className="fa-brands fa-square-github fa-2xl"></i>
                </a>
            </div>
        </div>
    );
}
