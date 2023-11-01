import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/base/BaseButton.vue';

describe('BaseButton', () => {
  it('mounts the component with an element slot', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: '<span class="slot-content">Button Content</span>'
      }
    });
    expect(wrapper.find('.slot-content').text()).toBe('Button Content');
  });

  it('mounts the component with a plain text slot', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Button Text'
      }
    });
    expect(wrapper.text()).toBe('Button Text');
  });

  it('has the correct base class', () => {
    const wrapper = mount(BaseButton);
    expect(wrapper.classes('base-button')).toBe(true);
  });

  it('passes through classes and other props', () => {
    const wrapper = mount(BaseButton, {
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
