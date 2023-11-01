import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseIcon from '@/components/base/BaseIcon.vue';

describe('BaseIcon', () => {
  it('has the correct aria-label from the label from', () => {
    const wrapper = shallowMount(BaseIcon, {
      props: {
        icon: 'download',
        label: 'Label Text'
      }
    });
    expect(wrapper.attributes('aria-label')).toBe('Label Text');
    expect(wrapper.attributes('aria-hidden')).toBeUndefined();
  });

  it('hides the label when the label prop is null', () => {
    const wrapper = shallowMount(BaseIcon, {
      props: {
        icon: 'download',
        label: null
      }
    });
    expect(wrapper.attributes('aria-label')).toBeUndefined();
    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });

  it('passes through classes and other props', () => {
    const wrapper = shallowMount(BaseIcon, {
      props: {
        icon: 'download',
        label: null,
        class: 'test-class',
        'data-any': 'dataValue'
      }
    });
    expect(wrapper.attributes('data-any')).toBe('dataValue');
    expect(wrapper.classes('test-class')).toBe(true);
  });
});
