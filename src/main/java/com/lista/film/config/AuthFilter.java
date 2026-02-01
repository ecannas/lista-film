package com.lista.film.config;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        String uri = req.getRequestURI();

        if (uri.startsWith("/login")
                || uri.startsWith("/register")
                || uri.startsWith("/logout")
                || uri.startsWith("/utenti/register")
                || uri.startsWith("/css")
                || uri.startsWith("/js")
                || uri.startsWith("/images")) {
            chain.doFilter(request, response);
            return;
        }

        HttpSession session = req.getSession(false);
        if (session != null && session.getAttribute("utente") != null) {
            chain.doFilter(request, response);
        } else {
            res.sendRedirect("/login.html");
        }
    }
}