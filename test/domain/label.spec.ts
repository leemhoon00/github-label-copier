import { isEqualLabel, Label } from 'src/domain/label';

describe('label', () => {
  describe('isEqualLabel', () => {
    it('should return false when names are different', () => {
      // given
      const label1: Label = {
        name: 'bug',
        color: '000000',
        description: 'its bug',
      };
      const label2: Label = {
        name: 'bug2',
        color: '000000',
        description: 'its bug',
      };

      // when
      const result = isEqualLabel(label1, label2);

      // then
      expect(result).toBe(false);
    });

    it('should return false when colors are different', () => {
      // given
      const label1: Label = {
        name: 'bug',
        color: '000000',
        description: 'its bug',
      };
      const label2: Label = {
        name: 'bug',
        color: 'ffffff',
        description: 'its bug',
      };

      // when
      const result = isEqualLabel(label1, label2);

      // then
      expect(result).toBe(false);
    });

    it('should return false when descriptions are different', () => {
      // given
      const label1: Label = {
        name: 'bug',
        color: '000000',
        description: 'its bug',
      };
      const label2: Label = {
        name: 'bug',
        color: '000000',
        description: 'its bug2',
      };

      // when
      const result = isEqualLabel(label1, label2);

      // then
      expect(result).toBe(false);
    });

    it('should return true when labels are equal', () => {
      // given
      const label1: Label = {
        name: 'bug',
        color: '000000',
        description: 'its bug',
      };
      const label2: Label = {
        name: 'bug',
        color: '000000',
        description: 'its bug',
      };

      // when
      const result = isEqualLabel(label1, label2);

      // then
      expect(result).toBe(true);
    });
  });
});
