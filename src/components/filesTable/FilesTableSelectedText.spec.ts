import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FilesTableSelectedText from '@/components/filesTable/FilesTableSelectedText.vue';

describe('FilesTableSelectedText', () => {
  it('shows the correct text when the count is 0', () => {
    const wrapper = mount(FilesTableSelectedText, { props: { count: 0 } });
    expect(wrapper.text()).toContain('None Selected');
  });

  it('shows the correct text when the count is 4', () => {
    const wrapper = mount(FilesTableSelectedText, { props: { count: 4 } });
    expect(wrapper.text()).toContain('Selected 4');
  });
});
