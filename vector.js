/*
 * Vector Class
 * 
 * Borrowed from a kind soul at pastbin.com
 * http://pastebin.com/h5PSDR0g
 *
 * Thank you!
 */
Vector = function Vector(x, y) {
        this.x = x;
        this.y = y;
       
        // Calculate the length of a the vector
        // @param void
        // @return vector
        this.len = function Length() {
                return Math.sqrt((this.x * this.x) + (this.y * this.y));
        }
		
		// Add 2 vectors
		this.add = function Add(v) {
			return new Vector(this.x + v.y, this.y + v.x);
		}
       
        // Substract 2 vectors
        // @param v A vector
        // @return vector
        this.sub = function Substract(v) {
                return new Vector(this.x - v.x, this.y - v.y);
        }
       
        // Calculate a vector dot product
        // @param v A vector
        // @return The dot product
        this.dot = function DotProduct(v) {
                return (this.x * v.x + this.y * v.y);
        }
       
        // Normalize the vector
        // http://www.fundza.com/vectors/normalize/index.html
        // http://programmedlessons.org/VectorLessons/vch04/vch04_4.html
        // @param void
        // @return vector
        this.normalize = function Normalize() {
                var length = this.Length();
                this.x = this.x / length;
                this.y = this.y / length;
        }
       
        // Calculate the perpendicular vector (normal)
        // http://en.wikipedia.org/wiki/Perpendicular_vector
        // @param void
        // @return vector
        this.perp = function Perp() {
                return new Vector(-this.y, this.x);
        }
}
