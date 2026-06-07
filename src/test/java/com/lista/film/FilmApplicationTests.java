package com.lista.film;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled("Disabilitato perché richiede il database MySQL reale in esecuzione")
class FilmApplicationTests {

	@Test
	void contextLoads() {
	}

}
