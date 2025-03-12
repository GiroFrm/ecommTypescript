import { it, expect, describe } from 'vitest';
import{approxPrice} from '../src/utils';

describe('approxPrice function', () => {
    
    it('should round a price to two decimal places',()=>{
        expect(approxPrice(12.3456)).toBe(12.35)
        expect(approxPrice(12.3426)).toBe(12.34)
        expect(approxPrice(12.999)).toBe(13.00)
        expect(approxPrice(112.0800000)).toBe(112.08)
    })

    it('should handles integer correctly',()=>{
        expect(approxPrice(12)).toBe(12)
    })

   
})