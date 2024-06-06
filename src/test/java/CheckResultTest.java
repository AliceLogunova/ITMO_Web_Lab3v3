import org.junit.Test;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import com.example.web_3.CheckResult;


public class CheckResultTest {
    public CheckResultTest(){}
    CheckResult checkResult = new CheckResult();

    @Test
    public void testCheckSquare() {
        // Тест для случая с квадратом
        assertTrue(checkResult.check(1, 0.5f, 2)); // внутри квадрата
        assertTrue(checkResult.check(1.5f, 1, 2)); // вне квадрата
        assertFalse(checkResult.check(3, 1, 2)); // вне квадрата
        assertFalse(checkResult.check(1, 2, 2)); // вне квадрата
    }

    @Test
    public void testCheckTriangle() {
        // Тест для случая с треугольником
        assertTrue(checkResult.check(-1, -1, 2)); // внутри треугольника
        assertFalse(checkResult.check(-2, -1, 2)); // вне треугольника
    }

    @Test
    public void testCheckCircle() {
        // Тест для случая с четвертью круга
        assertTrue(checkResult.check(-1, 1, 2)); // внутри четверти круга
        assertFalse(checkResult.check(-3, 3, 2)); // вне четверти круга
    }

    @Test
    public void testCheckOutside() {
        // Тест для точек вне всех областей
        assertFalse(checkResult.check(3, 3, 2)); // вне всех областей
        assertFalse(checkResult.check(-3, -3, 2)); // вне всех областей
    }
}
